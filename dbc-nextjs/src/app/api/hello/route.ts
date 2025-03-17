import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello, World!' })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      message: 'Hello from POST!',
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON data' },
      { status: 400 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { name = 'Anonymous' } = body

    return NextResponse.json({ 
      message: `Hello ${name} from PUT!`,
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON data' },
      { status: 400 }
    )
  }
}

export async function DELETE() {
  return NextResponse.json({ message: 'Hello from DELETE!' })
} 