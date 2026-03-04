from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from supabase import create_client, Client
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase: Client = create_client(os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY"))

class RegistrationData(BaseModel):
    name: str
    email: str
    phone_number: str
    alternative_contact: str | None = None  # <-- New Field Added Here
    gender: str
    address: str
    current_institute: str
    payment_method: str
    transaction_id: str | None = None

def send_confirmation_email(recipient_email: str, name: str):
    msg = EmailMessage()
    msg.set_content(
        f"আসসালামু আলাইকুম {name},\n\n"
        f"আলহামদুলিল্লাহ, SSC Batch 2021-এর উদ্যোগে আয়োজিত ইফতার মাহফিলে আপনার রেজিস্ট্রেশন সম্পন্ন হয়েছে।\n\n"
        f"আপনার উপস্থিতি আমাদের এই আয়োজনকে সফল ও সার্থক করে তুলবে ইনশাআল্লাহ।\n\n"
        f"ধন্যবাদ,\nআয়োজক কমিটি, SSC Batch 2021"
    )
    msg['Subject'] = 'Iftar Mahfil Registration Confirmation'
    msg['From'] = os.environ.get("EMAIL_SENDER")
    msg['To'] = recipient_email

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(os.environ.get("EMAIL_SENDER"), os.environ.get("EMAIL_PASSWORD"))
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f"Failed to send email: {e}")

@app.post("/api/register")
async def register_user(reg: RegistrationData):
    try:
        # Insert into Supabase
        data, count = supabase.table("iftar_registrations").insert(reg.dict()).execute()
        
        # Send confirmation email
        send_confirmation_email(reg.email, reg.name)
        
        return {"message": "Registration successful"}
        
    except Exception as e:
        error_msg = str(e)
        if "unique_email" in error_msg or "duplicate key value" in error_msg:
            raise HTTPException(status_code=400, detail="This email has already been used to register.")
        raise HTTPException(status_code=500, detail="An error occurred during registration.")