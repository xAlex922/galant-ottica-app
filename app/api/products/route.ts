import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const filters = {
      categoria: searchParams.get('categoria') || undefined,
      marca: searchParams.get('marca') || undefined,
      search: searchParams.get('search') || undefined,
      inEvidenza: searchParams.get('inEvidenza') === 'true',
    };

    const { data, error } = await getProducts(filters);

    if (error) {
      return NextResponse.json(
        { error },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}