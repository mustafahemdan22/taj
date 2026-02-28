import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('images') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No images provided' },
                { status: 400 }
            );
        }

        const uploadedPublicIds: string[] = [];

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const result = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'taj-scarf/products',
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            if (result?.public_id) {
                uploadedPublicIds.push(result.public_id);
            }
        }

        return NextResponse.json({ publicIds: uploadedPublicIds });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}
