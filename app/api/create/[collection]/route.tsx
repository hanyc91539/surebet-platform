import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Review from "@/models/Review";
import Product from "@/models/Product";
import History from "@/models/History";
import { historyCollection, productCollection, reviewCollection, userCollection } from "@/config/collections";


export const POST = async (request: any, { params }: { params: { collection: string } }) => {
    const result = await request.json();
    
    await connect();

    if (params.collection == userCollection) {
        const {name, email, password, avatar, is_admin, products} = result;

        const existingUser = await User.findOne( {email} );

        if (existingUser) {
            return new NextResponse("Email is already in use", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar,
            is_admin,
            products
        });

        try {
            await newUser.save();
            return new NextResponse("user is registered", { status: 200 });
        } catch (err: any) {
            return new NextResponse(err.message, {
                status: 500,
            });
        }
    }
    else if (params.collection == reviewCollection) {
        const newReview = new Review(result);

        try {
            await newReview.save();
            return new NextResponse("review is saved", { status: 200 });
        } catch (err: any) {
            return new NextResponse(err.message, {
                status: 500,
            });
        }
    }
    else if (params.collection == productCollection) {
        const newProduct = new Product(result);

        try {
            await newProduct.save();
            return new NextResponse("product is saved", { status: 200 });
        } catch (err: any) {
            return new NextResponse(err.message, {
                status: 500,
            });
        }
    }
    else if (params.collection == historyCollection) {
        const newHistory = new History(result);

        try {
            await newHistory.save();
            return new NextResponse("history is saved", { status: 200 });
        } catch (err: any) {
            return new NextResponse(err.message, {
                status: 500,
            });
        }
    }
    else {
        return new NextResponse(`"There is no "${params.collection}" collecion"`, { status: 400 })
    }

};