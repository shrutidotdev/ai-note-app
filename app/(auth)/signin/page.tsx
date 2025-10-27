import { Metadata } from "next";
import SigninForm from "./SignInForm";

export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in to your account",
};

export default function Page() {
    return <SigninForm />;
}