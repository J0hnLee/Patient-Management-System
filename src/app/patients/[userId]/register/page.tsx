import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions';
import { SearchParamsProps } from '@/types';
//const Register = async ({params:{userId}}:SearchParamsProps) => {
  const Register = async ({params:{userId}}:SearchParamsProps) => {

  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            alt="logo"
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user}/>
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="copyright py-12">
              © 2024 LeadwayCarePulse
            </p>
            
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  )
}

export default Register