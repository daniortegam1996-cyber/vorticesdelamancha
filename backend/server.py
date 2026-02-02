from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import os
import logging
from pathlib import Path
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Vórtices de la Mancha API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============================================
# Email Configuration
# ============================================
mail_config = ConnectionConfig(
    MAIL_USERNAME=os.environ.get('SMTP_USERNAME', ''),
    MAIL_PASSWORD=os.environ.get('SMTP_PASSWORD', ''),
    MAIL_FROM=os.environ.get('SMTP_FROM_EMAIL', 'informacion@vorticesdelamancha.com'),
    MAIL_PORT=int(os.environ.get('SMTP_PORT', 587)),
    MAIL_SERVER=os.environ.get('SMTP_SERVER', 'smtp.example.com'),
    MAIL_FROM_NAME=os.environ.get('SMTP_FROM_NAME', 'Vórtices de la Mancha'),
    MAIL_STARTTLS=os.environ.get('SMTP_STARTTLS', 'True').lower() == 'true',
    MAIL_SSL_TLS=os.environ.get('SMTP_SSL_TLS', 'False').lower() == 'true',
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER=ROOT_DIR / 'templates'
)

fm = FastMail(mail_config)

# ============================================
# Models
# ============================================
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    """Modelo para el formulario de contacto"""
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)
    name: Optional[str] = Field(None, max_length=100)

class ContactResponse(BaseModel):
    """Respuesta del endpoint de contacto"""
    success: bool
    message: str

class MembershipForm(BaseModel):
    """Modelo para el formulario de membresía"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=9, max_length=20)
    license_number: Optional[str] = Field(None, max_length=50)
    plan: str = Field(..., pattern="^(basic|pilot|premium)$")

class MembershipResponse(BaseModel):
    """Respuesta del endpoint de membresía"""
    success: bool
    message: str
    membership_id: Optional[str] = None

# ============================================
# Routes
# ============================================
@api_router.get("/")
async def root():
    return {"message": "Vórtices de la Mancha API v1.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# ============================================
# Contact Endpoint
# ============================================
@api_router.post("/contact", response_model=ContactResponse)
async def send_contact_email(form: ContactForm, background_tasks: BackgroundTasks):
    """
    Endpoint para enviar emails desde el formulario de contacto.
    El email se envía a informacion@vorticesdelamancha.com con reply-to al remitente.
    """
    try:
        # Verificar que las credenciales SMTP están configuradas
        if not os.environ.get('SMTP_USERNAME') or not os.environ.get('SMTP_PASSWORD'):
            logger.warning("SMTP credentials not configured - email not sent")
            # En desarrollo, simular éxito
            if os.environ.get('DEBUG', 'false').lower() == 'true':
                return ContactResponse(
                    success=True,
                    message="Mensaje recibido (modo desarrollo - email no enviado)"
                )
            raise HTTPException(
                status_code=503,
                detail="El servicio de correo no está configurado"
            )
        
        # Crear el contenido del email
        sender_name = form.name or "Visitante web"
        
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #001f3f 0%, #0074D9 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">📬 Nuevo mensaje de contacto</h1>
                </div>
                <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px;">
                    <p><strong>De:</strong> {sender_name}</p>
                    <p><strong>Email:</strong> <a href="mailto:{form.email}">{form.email}</a></p>
                    <p><strong>Asunto:</strong> {form.subject}</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p><strong>Mensaje:</strong></p>
                    <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #0074D9;">
                        {form.message.replace(chr(10), '<br>')}
                    </div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666;">
                        Este mensaje fue enviado desde el formulario de contacto de la web de Vórtices de la Mancha.
                        <br>Fecha: {datetime.now(timezone.utc).strftime('%d/%m/%Y %H:%M UTC')}
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Configurar el mensaje
        message = MessageSchema(
            subject=f"[Web] {form.subject}",
            recipients=[os.environ.get('SMTP_TO_EMAIL', 'informacion@vorticesdelamancha.com')],
            body=html_content,
            subtype=MessageType.html,
            reply_to=[form.email]  # Reply-to al usuario que escribe
        )
        
        # Enviar email en background para no bloquear la respuesta
        background_tasks.add_task(fm.send_message, message)
        
        # Guardar en base de datos para registro
        contact_record = {
            "id": str(uuid.uuid4()),
            "name": sender_name,
            "email": form.email,
            "subject": form.subject,
            "message": form.message,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "sent"
        }
        await db.contact_messages.insert_one(contact_record)
        
        logger.info(f"Contact email queued for {form.email}")
        
        return ContactResponse(
            success=True,
            message="¡Mensaje enviado correctamente! Te responderemos pronto."
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error sending contact email: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al enviar el mensaje. Por favor, inténtalo de nuevo."
        )

# ============================================
# Membership Endpoint
# ============================================
@api_router.post("/membership", response_model=MembershipResponse)
async def submit_membership(form: MembershipForm, background_tasks: BackgroundTasks):
    """
    Endpoint para procesar solicitudes de membresía.
    Guarda la solicitud y envía notificación por email.
    """
    try:
        membership_id = str(uuid.uuid4())[:8].upper()
        
        # Guardar solicitud en base de datos
        membership_record = {
            "id": membership_id,
            "name": form.name,
            "email": form.email,
            "phone": form.phone,
            "license_number": form.license_number,
            "plan": form.plan,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending"
        }
        await db.membership_requests.insert_one(membership_record)
        
        # Nombres de planes en español
        plan_names = {
            "basic": "Socio Básico (50€/año)",
            "pilot": "Socio Piloto (120€/año)",
            "premium": "Socio Premium (200€/año)"
        }
        
        # Enviar email de notificación si está configurado
        if os.environ.get('SMTP_USERNAME') and os.environ.get('SMTP_PASSWORD'):
            html_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #001f3f 0%, #0074D9 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Nueva solicitud de socio</h1>
                    </div>
                    <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px;">
                        <p><strong>ID Solicitud:</strong> #{membership_id}</p>
                        <p><strong>Nombre:</strong> {form.name}</p>
                        <p><strong>Email:</strong> <a href="mailto:{form.email}">{form.email}</a></p>
                        <p><strong>Teléfono:</strong> {form.phone}</p>
                        <p><strong>Licencia:</strong> {form.license_number or 'No especificada'}</p>
                        <p><strong>Plan seleccionado:</strong> {plan_names.get(form.plan, form.plan)}</p>
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p style="font-size: 12px; color: #666;">
                            Solicitud recibida el {datetime.now(timezone.utc).strftime('%d/%m/%Y %H:%M UTC')}
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            message = MessageSchema(
                subject=f"[Nueva Solicitud] {form.name} - {plan_names.get(form.plan, form.plan)}",
                recipients=[os.environ.get('SMTP_TO_EMAIL', 'informacion@vorticesdelamancha.com')],
                body=html_content,
                subtype=MessageType.html,
                reply_to=[form.email]
            )
            
            background_tasks.add_task(fm.send_message, message)
        
        logger.info(f"Membership request {membership_id} created for {form.email}")
        
        return MembershipResponse(
            success=True,
            message="¡Solicitud enviada! Te contactaremos pronto para completar tu inscripción.",
            membership_id=membership_id
        )
        
    except Exception as e:
        logger.error(f"Error processing membership: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error al procesar la solicitud. Por favor, inténtalo de nuevo."
        )

# ============================================
# Status Endpoints (existing)
# ============================================
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Include the router in the main app
app.include_router(api_router)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
