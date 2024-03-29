'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { Button } from '@/lib/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/lib/components/ui/card'
import { Input } from '@/lib/components/ui/input'
import { Label } from '@/lib/components/ui/label'
import { createClient } from '@/lib/utils/supabase/client'

const Register = () => {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (user) {
                router.push('/')
            }
        }
        checkSession()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>
                            Input your email and password to sign up
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Input Email"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Input Password"
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full">Sign Up</Button>
                        <p className="mt-4 text-center text-xs text-gray-700">
                            {' '}
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => router.push('/login')}
                                className=" text-blue-600 hover:underline"
                            >
                                Sign In
                            </button>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Register
