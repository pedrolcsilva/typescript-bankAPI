interface Account {
    agency: string,
    verifying_agency_digit: string,
    account_number: string,
    verifying_account_digit: string,
    balance: string,
    id: string,
    owner_id: string,
    password: string
}

export {Account}