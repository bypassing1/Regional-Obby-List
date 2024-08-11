import {
    put,
    delete as deleteBlob
} from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const {
            blobUrl,
            updatedData
        } = req.body;
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        const blobKey = new URL(blobUrl).pathname.substring(1);

        if (!blobKey || !updatedData) {
            res.status(400).json({
                message: "Missing blobKey or updatedData"
            });
            return;
        }

        try {
            const parsedData = JSON.parse(updatedData);

            // 1. Create the new version with the updated data
            const result = await put(blobKey, JSON.stringify(parsedData), {
                headers: {
                    Authorization: `Bearer ${blobToken}`,
                    "Content-Type": "application/json",
                },
                access: "public",
            });

            if (!result.url) {
                console.error("Failed to update JSON data. Result:", result);
                res.status(500).json({
                    message: "Failed to update JSON data."
                });
                return;
            }

            // 2. Extract the versionId from the new blob's URL
            const newVersionId = new URL(result.url).searchParams.get("versionId");

            // 3. Delete the old version(s)
            try {
                await deleteBlob(blobKey, {
                    headers: {
                        Authorization: `Bearer ${blobToken}`,
                    },
                    excludeVersionIds: [newVersionId], // Keep the new version
                });
                console.log("Old versions deleted successfully");
            } catch (deleteError) {
                console.error("Error deleting old versions:", deleteError);
                // You might want to handle this error gracefully, perhaps by informing the user
            }

            console.log("JSON data updated successfully:", result.url);
            res.status(200).json({
                message: "JSON data updated successfully!"
            });
        } catch (error) {
            console.error("Server error:", error);
            res.status(500).json({
                message: "Server error.",
                error: error.message
            });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}