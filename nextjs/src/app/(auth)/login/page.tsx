'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/utils/supabase/client'

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

const Login = () => {
    const supabase = createClient()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()

            if (session) {
                router.push('/')
            }
        }
        checkSession()
    }, [])

    const handleSubmitLogin = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            console.log(error)
        } else return router.push('/')

        setLoading(false)
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <form onSubmit={handleSubmitLogin}>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Sign in</CardTitle>
                            <CardDescription>
                                Input your email and password to sign in
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Input Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Input Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={loading}
                            >
                                Login
                            </Button>
                            <p className="mt-4 text-center text-xs text-gray-700">
                                {' '}
                                Create New Account?{' '}
                                <span
                                    // onClick={() => router.push('/register')}
                                    onClick={() => router.push('/register-srv')}
                                    className=" text-blue-600 hover:underline"
                                >
                                    Sign Up
                                </span>
                            </p>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}

export default Login
