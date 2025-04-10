import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import { writeFile } from "fs/promises";
// import path from "path";




export async function POST(request: NextRequest) {
    await connect();
    try {

        const reqBody = await request.formData();
        const email = reqBody.get('email') as string
        const firstname = reqBody.get('firstname') as string
        const lastname = reqBody.get('lastname') as string
        const monthlyContributionAmount = reqBody.get('monthlyContributionAmount') as string
        const phoneNumber = reqBody.get('phoneNumber') as string
        const role = reqBody.get('role') as string
        const gender = reqBody.get('gender') as string
        const identification = reqBody.get('identification') as string
        const id = reqBody.get("id") as string
        const imgDelete = reqBody.get("imgDelete")


        console.log(id)


        const user = await User.findOne({_id: id});
        if (!user) {
            return NextResponse.json({ message: "User doesn't exist" }, { status: 400 });
        }

        console.log(user)

        user.set({
            firstname,
            lastname,
            email,
            role,
            phoneNumber: parseInt(phoneNumber),
            gender,
            identification: parseInt(identification),
            monthlyContributionAmount: parseInt(monthlyContributionAmount)
        });
    

        const file: File | null = reqBody.get('image_url') as unknown as File
        if (file) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const modifiedFileName = `${Date.now().toString()}_${file.name}`
            const imgPath = `public/images/profilePic/${modifiedFileName}`
            await writeFile(imgPath, buffer);

            // const currentPath = path.join(process.cwd(), 'public', user.image_url);

            user.image_url = `/images/profilePic/${modifiedFileName}`

            // // Delete the image file
            //     try {
            //         await fs.unlink(currentPath);
            //     } catch (error) {
            //         console.error("Error deleting the file:", error);
            //         return NextResponse.json({ message: "Error deleting the file" });
            //     }
        } else if (imgDelete && imgDelete === "true") {
            user.image_url = "/images/profilePic/unknown.png"
        }
        await user.save()
        return NextResponse.json({ message: "User updated successfully", user });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to create user", error }, { status: 500 });
    }
}







