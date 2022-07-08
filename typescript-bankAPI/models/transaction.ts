interface Transaction {
    id: string,
    type: string,
    amount: string,
    created_at: number,
    source_id: string
}

export {Transaction};