'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/lib/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/lib/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/lib/components/ui/dialog'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: 'pending' | 'processing' | 'success' | 'failed'
    email: string
}

// export function DeleteModal() {
//     return (
// <>
//     <Dialog>
//         <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//                 <DialogTitle>Delete User</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//                 <p>Are you sure you want to delete this item?</p>
//             </div>
//             <DialogFooter>
//                 <DialogClose asChild>
//                     <Button type="button">Save</Button>
//                 </DialogClose>
//             </DialogFooter>
//         </DialogContent>
//     </Dialog>
// </>
//     )
// }

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'amount',
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const payment = row.original
            const router = useRouter()
            const [openDelete, setOpenDelete] = useState(false)
            const handleDelete = () => {
                setOpenDelete(true)
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    router.push('/payment/edit-data')
                                }
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete()}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <>
                        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Delete User</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <p>
                                        Are you sure you want to delete this
                                        item?
                                    </p>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline">
                                            No
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button type="button">Yes</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>
                </>
            )
        },
    },
]
