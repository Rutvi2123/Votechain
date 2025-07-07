import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const { campaignId } = await request.json();

    try {
        // Get voters from database
        const voters = await prisma.voter.findMany();

        // Setup email transporter (Use your SMTP credentials)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_HOST_USER,
                pass: process.env.EMAIL_HOST_PASSWORD,
            },
        });

        for (const voter of voters) {
            const newPassword = Math.random().toString(36).slice(-8); // Generate random password

            // Update password in DB with bcrypt hash
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.voter.update({
                where: { email: voter.email },
                data: { password: hashedPassword },
            });

            // Email content
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: voter.email,
                subject: "Upcoming Voting Campaign - Your Login Credentials",
                text: `Hello ${voter.name},\n\nA new voting campaign is starting soon!\n\nCampaign ID: ${campaignId}\nYour login details:\nEmail: ${voter.email}\nPassword: ${newPassword}\n\nLogin now to participate!\n\nBest Regards,\nVoting Platform Team`,
            };

            await transporter.sendMail(mailOptions);
        }

        return new Response(JSON.stringify({ message: "Emails sent successfully" }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Failed to sent emails" }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}