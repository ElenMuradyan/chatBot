// src/app/api/functions/ImageGeneration/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      params: {
        query: prompt,
        per_page: 1,
      },
    });

    const results = response.data.results;

    if (results && results.length > 0) {
      const imageUrl = results[0].urls.regular;
      return NextResponse.json({ image: imageUrl });
    } else {
      return NextResponse.json({ error: 'No image found' }, { status: 404 });
    }
  } catch (err) {
    console.error('Unsplash image search error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
