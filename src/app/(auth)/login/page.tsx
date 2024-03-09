'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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

const Login = () => {
    const supabase = createClient()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

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

    const handleSubmitLogin = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (!error) {
            router.push('/')
        }
        setLoading(false)
    }

    const gotoRegister = () => {
        router.push('/register-srv')
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
                                <button
                                    type="button"
                                    onClick={gotoRegister}
                                    className=" text-blue-600 hover:underline"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}

export default Login
