"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { encryptKey, decryptKey } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const PassKeyModal = ({ isAdmin }: { isAdmin: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(isAdmin);
  const [passKey, setPassKey] = useState("");
  // console.log("🚀 ~ PassKeyModal ~ passKey:", passKey)
  const [error, setError] = useState("");
  const [hasRedirected, setHasRedirected] = useState(false); // 新增狀態

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;
  console.log("🚀 ~ PassKeyModal ~ encryptedKey:", encryptedKey);
  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    console.log("🚀 ~ useEffect ~ accessKey:", accessKey);
    if (pathname && !hasRedirected) {
      // 檢查是否已經轉跳
      console.log("🚀 ~ useEffect ~ accessKey:", accessKey);
      console.log(
        "🚀 ~ useEffect ~ process.env.NEXT_PUBLIC_ADMIN_PASSKEY:",
        process.env.NEXT_PUBLIC_ADMIN_PASSKEY
      );
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        setHasRedirected(true); // 設置為已轉跳

        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey, hasRedirected]);
  const closeModal = () => {
    setOpen(false);
    router.push("/admin");
  };
  const validatePassKey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    //TODO: validate passkey
    e.preventDefault();

    if (passKey === process.env.NEXT_PUBLIC_PASSKEY) {
      const encryptedKey = encryptKey(passKey);
      console.log("🚀 ~ PassKeyModal ~ encryptedKey:", encryptedKey);

      localStorage.setItem("accessKey", encryptedKey);

      setOpen(false);
      //router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passKey}
            onChange={(value) => setPassKey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            className="shad-primary-btn w-full"
            onClick={(e) => {
              return validatePassKey(e);
            }}
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
