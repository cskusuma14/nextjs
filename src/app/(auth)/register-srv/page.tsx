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
        if (error) {
            console.log(error)
        } else return redirect('/login')
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <form>
                <div className="mt-4">
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" required />
                </div>
                <div className="mt-4">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                    />
                </div>
                <button className="mt-4" formAction={signUp}>
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterSr
