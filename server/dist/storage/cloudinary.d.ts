export declare class CloudinaryService {
    constructor();
    private initialize;
    uploadImage(fileBuffer: Buffer, folder?: string): Promise<string>;
    deleteImage(publicId: string): Promise<void>;
}
export declare const cloudinaryService: CloudinaryService;
//# sourceMappingURL=cloudinary.d.ts.map