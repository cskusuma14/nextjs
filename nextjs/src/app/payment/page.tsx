import type { Payment } from './columns'
import { columns } from './columns'
import { DataTable } from './data-table'

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: '1',
            amount: 300,
            status: 'pending',
            email: 'user1@example.com',
        },
        {
            id: '2',
            amount: 150,
            status: 'processing',
            email: 'mail2@example.com',
        },
        {
            id: '3',
            amount: 250,
            status: 'success',
            email: 'test3@example.com',
        },
        {
            id: '4',
            amount: 400,
            status: 'pending',
            email: 'hello4@example.com',
        },
        {
            id: '5',
            amount: 300,
            status: 'pending',
            email: 'world5@example.com',
        },
        {
            id: '6',
            amount: 150,
            status: 'processing',
            email: 'abcde6@example.com',
        },
        {
            id: '7',
            amount: 250,
            status: 'success',
            email: 'world7@example.com',
        },
        {
            id: '8',
            amount: 400,
            status: 'pending',
            email: 'alpha8@example.com',
        },
        {
            id: '9',
            amount: 300,
            status: 'pending',
            email: 'beta9@example.com',
        },
        {
            id: '10',
            amount: 150,
            status: 'processing',
            email: 'gamma10@example.com',
        },
        {
            id: '11',
            amount: 250,
            status: 'success',
            email: 'henry11@example.com',
        },
        {
            id: '12',
            amount: 400,
            status: 'pending',
            email: 'zidane12@example.com',
        },
    ]
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
