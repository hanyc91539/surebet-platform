import connect from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Review from "@/models/Review";
import Product from "@/models/Product";
import History from "@/models/History";
import { historyCollection, productCollection, reviewCollection, userCollection } from "@/config/collections";


export const DELETE = async (request: any, { params }: { params: { collection: string, id: string } }) => {
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
    else
    {
        model = null
    }
    
    if (model) {
        try {
            await model.deleteOne({ "_id": params.id });
            return new NextResponse(`"${params.collection} deleted"`, { status: 200 });
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
