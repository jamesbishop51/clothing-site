import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '~/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { total, cart, email, address, city, state, postalCode } = req.body;
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Order Details',
      text: 'Order Details',
      react: EmailTemplate({
        firstName: 'John',
        total,
        cart,
        email,
        address,
        city,
        state,
        postalCode
      }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}