"use client";
import React, { useState, useEffect, FormEvent, useTransition } from 'react'
import { auth } from '@/firebase'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Button from './button'

import {
    signInWithPhoneNumber,
    ConfirmationResult,
    RecaptchaVerifier,
} from 'firebase/auth'

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from '@/components/ui/input-otp'
import FormField from './formField';



export default function OtpLogin() {
    const router = useRouter()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState<string | null>('')
    const [success, setSuccess] = useState('')
    const [resendCountDown, setResendCountDown] = useState(0)

    const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null)

    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)

    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (resendCountDown > 0) {
            timer = setTimeout(() => setResendCountDown(resendCountDown - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [resendCountDown])

    useEffect(() => {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: (response: string) => {
                console.log("reCAPTCHA solved", response.slice(0, 10));
            },
            'expired-callback': () => {
                console.log("reCAPTCHA expired, please refresh");
            }
        });
        setRecaptchaVerifier(verifier);
    
        return () => verifier.clear();
    }, []);


    useEffect(() => {
       const hasEnteredAllDigits = otp.length === 6
       if (hasEnteredAllDigits) {
        verifyOtp()
       }
    }, [otp])

    const verifyOtp = async () => {
        startTransition(async () => {
            setError(null)

            if (!confirmationResult) {
                setError('Please request OTP again')
                return
            }
            try {
                await confirmationResult?.confirm(otp)
                router.push('/overview')
            } catch (error: unknown) {
                console.log(error)
                if (error instanceof Error && (error as { code?: string }).code === 'auth/invalid-verification-code') {
                    setError('Invalid OTP')
                } else {
                    setError('Failed to sign in')
                }
            }
        })
    }


    

    const requestOtp = async (e?: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault()
        setResendCountDown(60)

        startTransition(async () => {
            setError(null)
            setSuccess('')
            if (!recaptchaVerifier) {
                setError('Recaptcha verifier not found')
                return
            }
            try {
                const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
                setConfirmationResult(confirmationResult)
                setSuccess('OTP sent successfully')
            } catch (error: unknown) {
                setResendCountDown(0)
                console.log(error)
                if (error instanceof Error && (error as { code?: string }).code === 'auth/invalid-phone-number') {
                    setError('Invalid phone number')

                } else if (error instanceof Error && (error as { code?: string }).code === 'auth/too-many-requests') {
                    setError('Too many requests. Try again later')
                }
                else {
                    setError('Failed to send OTP')
                }

            }
        })
    }

    const loadingIndicator = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="8" cx="25" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4">
                </animate>
            </circle>
            <circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="8" cx="80" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2">
                </animate>
            </circle>
            <circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="8" cx="120" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0">
                </animate>
            </circle>
        </svg>
    )

    return (
        <div className="otp-login-wrapper">
            {
                !confirmationResult && (
                    <>
                        {/* <Input
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        /> */}
                        <FormField
                            label="Phone Number"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <p className='text-black-500 text-sm w-100 text-start'>
                            Please Enter your phone number
                        </p>
                    </>

                )
            }
            {
                confirmationResult && (
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0}/>
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup> 
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
            )}
            {/* <Button
                onClick={(e) => requestOtp(e as React.MouseEvent<HTMLButtonElement>)}
                disabled={isPending || !phoneNumber || resendCountDown > 0}
                className='mt-4'
            >
                {
                    resendCountDown > 0 ? `Resend OTP in ${resendCountDown}` : isPending ? 'Sending OTP...' : 'Send OTP'
                }
            </Button> */}

            <Button
                label={resendCountDown > 0 ? `Resend OTP in ${resendCountDown}` : isPending ? 'Sending OTP...' : 'Send OTP'}
                onClick={requestOtp}
                disabled={isPending || !(phoneNumber.length > 12)  || resendCountDown > 0}
                className="button-primary"


            />
            <div className='p-10 text-center'>
                {
                    error && <p className='text-red-500'>{error}</p>

                }
                {
                    success && <p className='text-green-500'>{success}</p>
                }
            </div>
            <div id="recaptcha-container"></div>
            {
                isPending && loadingIndicator
            }
        </div>
    )
}
