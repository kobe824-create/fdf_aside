export async function GET() {
    try {
        console.log("cron jobs executed")
    } catch (error) {
        console.log("error", error)
    }
}