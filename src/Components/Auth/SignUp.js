import React, { useState } from "react";
import eyeOff from "../../assets/eye-off.png";
import eye from "../../assets/eye.png";
import AuthLayout from "@/Layout/AuthLayout";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRegisterMutation } from "@/features/auth/authApi";
import { useRouter } from "next/router";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [register, { isLoading: registering }] = useRegisterMutation();

  const { push } = useRouter();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const form = e.target;

    const referralId = form.referralId.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const companyName = form.companyName.value;
    const phoneNumber = form.phoneNumber.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least one uppercase, one lowercase, one special character, one digit and it should be at least 8 characters long.",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password doesn't matched!",
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = {
        referralId,
        firstName,
        lastName,
        companyName,
        phoneNumber,
        email,
        password,
      };
      const res = await register(data);

      if (res?.error?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.error}`,
        });
      }
      if (res?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.data?.message}`,
        });
      }
      if (res?.data?.success) {
        push(`/validate-email/${email}`);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout>
      <div className="signIn">
        <div className="flex flex-wrap justify-end gap-2 items-center">
          <p className="dont">Already have any account?</p>{" "}
          <Link href="/" className="signUn_btn text-[20px]">
            Sign In
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-[32px]">Sign Up</h2>
          <p className="fs-6 subtitle">To prepare to log into the system</p>
          <div className="mb-2">
            <label className="fs-6" htmlFor="email">
              <span>*</span> Referral ID
            </label>
            <input
              className="p-5 h-[unset]"
              type="text"
              name="referralId"
              id="referralId"
              placeholder="Paste your referral ID or enter None if you were not refered"
              required
            />
          </div>

          <div className="mb-2">
            <label className="fs-6" htmlFor="fname">
              <span>*</span> First name
            </label>
            <input
              className="p-5 h-[unset]"
              type="text"
              name="firstName"
              id="fname"
              placeholder="Enter your  first name"
              required
            />
          </div>
          <div className="mb-2">
            <label className="fs-6" htmlFor="email">
              <span>*</span> Last name
            </label>
            <input
              className="p-5 h-[unset]"
              type="text"
              name="lastName"
              id="lname"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="fs-6" htmlFor="cname">
              <span>*</span> Company name
            </label>
            <input
              className="p-5 h-[unset]"
              type="text"
              name="companyName"
              id="cname"
              placeholder="Enter your company name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="fs-6" htmlFor="semail">
              <span>*</span> Email address
            </label>
            <input
              className="p-5 h-[unset]"
              type="email"
              name="email"
              id="semail"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="fs-6" htmlFor="cell">
              <span>*</span> Cell phone number
            </label>
            <input
              className="p-5 h-[unset]"
              type="tel"
              name="phoneNumber"
              id="cell"
              placeholder="Enter your cell phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="fs-6" htmlFor="password">
              <span>*</span> Password
            </label>
            <div className="relative">
              <input
                className="mb-2 p-5 h-[unset]"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                required
              />
              <img
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "20px",
                  cursor: "pointer",
                }}
                className="absolute "
                src={showPassword ? eye.src : eyeOff.src}
                alt=""
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="fs-6" htmlFor="confirmPassword">
              <span>*</span> Confirm Password
            </label>
            <div className="relative">
              <input
                className="mb-2 p-5 h-[unset]"
                type={showConPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter your password"
                required
              />
              <img
                onClick={() => setShowConPassword(!showConPassword)}
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "20px",
                  cursor: "pointer",
                }}
                className="absolute "
                src={showConPassword ? eye.src : eyeOff.src}
                alt=""
              />
            </div>
          </div>
          {/* <p className="err_sms mb-5">
            Email already exists in the system you must enter the Referral ID or
            contact customer service at (800) 123-1234
          </p> */}
          {/* <Link href="/dashboard"> */}
          <button
            className="signIn_btn fs-5 mb-5"
            type="submit"
            disabled={registering || isLoading}
          >
            {registering || isLoading ? "Creating..." : "Create account"}
          </button>
          {/* </Link> */}
        </form>
        <div></div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
