import connect from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Review from "@/models/Review";
import Product from "@/models/Product";
import History from "@/models/History";
import { historyCollection, productCollection, reviewCollection, userCollection } from "@/config/collections";
import { ALL, ONE } from "@/config/size";


export const GET = async (request: any, { params }: { params: { collection: string, size: String } }) => {
    const { searchParams } = new URL(request.url);
    const jsonData = JSON.stringify(Object.fromEntries(searchParams));

    await connect();

    let model: any = null

    if (params.collection == userCollection) {
        model = User
    }
    else if (params.collection == reviewCollection) {
        model = Review
    }
    else if (params.collection == productCollection) {
        model = Product
    }
    else if (params.collection == historyCollection) {
        model = History
    }
    else {
        model = null
    }

    if (model) {
        try {
            let user: any = null
            if (params.size == ALL) {
                if (jsonData) {
                    user = await model.find(JSON.parse(jsonData));
                }
                else {
                    user = await model.find();
                }

            }
            else {
                user = await model.findOne(JSON.parse(jsonData));
            }

            if (user) {
                return new NextResponse(JSON.stringify(user), { status: 200 });
            }
            else {
                return new NextResponse("Does Not Exist", { status: 200 });
            }
        } catch (err: any) {
            return new NextResponse(err.message, {
                status: 500,
            });
        }
    }
    else {
        return new NextResponse(`"There is no "${params.collection}" collecion"`, { status: 400 })
    }

}
