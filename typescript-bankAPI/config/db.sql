CREATE TABLE IF NOT EXISTS users (
	id VARCHAR(36) NOT NULL,
	name VARCHAR (50) NOT NULL,
	cpf VARCHAR (11) NOT NULL,
	email VARCHAR (255) NOT NULL,
	birthdate DATE NOT NULL,
	PRIMARY KEY (cpf, id)
);

CREATE TABLE IF NOT EXISTS accounts (
	id VARCHAR(36) NOT NULL,
	owner_id VARCHAR(36) NOT NULL,
	account_number VARCHAR (9) NOT NULL,
	verifying_account_digit VARCHAR (1) NOT NULL,
	agency VARCHAR (4) NOT NULL,
	verifying_agency_digit VARCHAR (1) NOT NULL,
	balance NUMERIC (20, 2) NOT NULL,
	password varchar (50) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE transactions(
	id varchar(36) NOT NULL PRIMARY KEY,
	type VARCHAR(1024) NOT NULL,
	amount NUMERIC(20, 2) NOT NULL CHECK (amount > 0.0),
	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
	source_id varchar(36) NOT NULL
);

SELECT * from users;
SELECT * from accounts;
SELECT * from transactions;
SELECT * from transactions WHERE source_id = '6ad66426-ef27-4c9b-8f87-d2d7d986dc29' ORDER BY created_at;
INSERT INTO transactions (
                    id,
                    type,
                    amount,
					source_id
                ) VALUES (
                    1,
                    'transfer',
                    10,
					'f2942dd5-18fd-439c-872d-964a0db29ca6'
                ) RETURNING id
				
UPDATE accounts SET balance = balance + 100 WHERE account_number = '268148666' AND agency = '7827';


INSERT INTO accounts (
                    id,
                    owner_id,
                    account_number,
                    verifying_account_digit,
                    agency,
                    verifying_agency_digit,
                    balance,
                    password
                ) VALUES (
                    'f2942dd5-18fd-439c-872d-964a0db29ca6',
                    'f1234dd5-18fd-439c-872d-964a0db29ca6',
                    '123456789',
                    '9',
                    '1234',
                    '4',
                    '0',
                    '8317'
                ) RETURNING id