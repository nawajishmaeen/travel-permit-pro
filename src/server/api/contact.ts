
import { sendContactFormEmail } from '@/utils/emailService';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the data
    if (!data.name || !data.email || !data.subject || !data.message) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Send the email
    const result = await sendContactFormEmail(data);
    
    return new Response(
      JSON.stringify({ message: 'Email sent successfully', success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in contact API:', error);
    
    return new Response(
      JSON.stringify({ 
        message: error instanceof Error ? error.message : 'An error occurred while processing your request',
        success: false
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
