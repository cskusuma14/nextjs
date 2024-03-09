import { redirect } from 'next/navigation'
import React from 'react'

import { createClient } from '@/lib/utils/supabase/server'

const RegisterSr = () => {
    const signUp = async (formData: FormData) => {
        'use server'

        const supabase = createClient()

        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const { error } = await supabase.auth.signUp(data)
        if (!error) {
            redirect('/login')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <form>
                <div className="mt-4">
                    <label htmlFor="email">
                        Email:
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="border-2 border-black"
                            required
                        />
                    </label>
                </div>
                <div className="mt-4">
                    <label htmlFor="password">
                        Password:
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="border-2 border-black"
                            required
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="mt-4 rounded-lg border-2 border-black px-3 py-2"
                    formAction={signUp}
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterSr
