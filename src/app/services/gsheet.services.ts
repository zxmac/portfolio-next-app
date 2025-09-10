async function get(sheetId: string) {
    if (!process.env.NEXT_PUBLIC_GSHEET_API_KEYS?.split('|').find(x => sheetId.indexOf(x) == 0)) throw new Error("GSheetID not registered!");
    const url = `${process.env.NEXT_PUBLIC_GSHEET_API}v4/spreadsheets/${sheetId}/values:batchGet?ranges=Sheet1&key=${process.env.NEXT_PUBLIC_GCLOUD_API_KEY}`;
    const response = await fetch(url)
    if (!response.ok) { // Check for HTTP errors (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export const GSheetService = { get };