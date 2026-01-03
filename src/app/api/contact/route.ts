
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// You would ideally create a transporter based on env variables
// For example, if using Gmail:
/*
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
*/

// Or using a custom SMTP (which supports "admin@insightexus.com" if you have credentials)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const company = formData.get('company') as string;
        const service = formData.get('service') as string;
        const message = formData.get('message') as string;
        const file = formData.get('attachment') as File | null;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const attachments = [];
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            attachments.push({
                filename: file.name,
                content: buffer,
            });
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@insightexus.com';
        const fromEmail = process.env.SMTP_FROM_EMAIL || adminEmail;

        // 1. Email to Admin
        const adminMailOptions = {
            from: `"${name}" <${fromEmail}>`, // Actually sending FROM your authenticated domain, but labeled as User Name
            to: adminEmail,
            replyTo: email, // Admin can reply directly to user
            subject: `New Contact Form Submission: ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Company: ${company}
        Service: ${service}
        
        Message:
        ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service:</strong> ${service}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
            attachments: attachments,
        };

        // 2. Confirmation Email to User
        const userMailOptions = {
            from: `"InsightExus Team" <${fromEmail}>`,
            to: email,
            subject: `We've received your message - InsightExus`,
            text: `Hi ${name},\n\nThank you for reaching out to InsightExus. We have received your inquiry regarding ${service} and will get back to you shortly.\n\nBest regards,\nThe InsightExus Team`,
            html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0ea5e9;">Thank You for Contacting Us</h2>
            <p>Hi ${name},</p>
            <p>We have received your inquiry regarding <strong>${service}</strong>.</p>
            <p>Our team is reviewing your details and will get back to you within 24 hours.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The InsightExus Team</strong></p>
            <p style="font-size: 12px; color: #64748b;">This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        `
        };

        // Send Admin Email
        await transporter.sendMail(adminMailOptions);

        // Send User Confirmation
        await transporter.sendMail(userMailOptions);

        return NextResponse.json({ success: true, message: 'Emails sent successfully' });

    } catch (error: any) {
        console.error('Email handling error:', error);
        return NextResponse.json(
            { error: 'Failed to send email', details: error.message },
            { status: 500 }
        );
    }
}
