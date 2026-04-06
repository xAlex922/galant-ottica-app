import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createOrder, getOrdersByCustomer } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get user from auth header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get cliente_id from auth_user_id
    const { data: cliente } = await supabase
      .from('clienti')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!cliente) {
      return NextResponse.json({ error: 'Cliente not found' }, { status: 404 });
    }

    // Fetch orders
    const { data, error } = await getOrdersByCustomer(cliente.id);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Orders API error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    const { data, error } = await createOrder(orderData);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}