import connect from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Review from "@/models/Review";
import Product from "@/models/Product";
import History from "@/models/History";
import { historyCollection, productCollection, reviewCollection, userCollection } from "@/config/collections";


export const PUT = async (request: any, { params }: { params: { collection: string } }) => {
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
        const { id, ...rest } = await request.json();

        try {
            await model.updateOne({ "_id": id }, { $set: rest, $currentDate: { lastModified: true } });
            return new NextResponse("updated", { status: 200 })
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
