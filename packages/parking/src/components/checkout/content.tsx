"use client";

import { SectionBookingDetails } from "./section-booking-details";
import { SectionStartCheckout } from "./section-get-started";
import { SectionParkingDetails } from "./section-parking-details";
import { SectionPaymentInformation } from "./section-payment-info";



export const Content = () => (
    <div className="flex flex-col w-full px-2 gap-5 md:gap-10">
        <div className="h-full z-10 w-full">
            <h1 className="text-2xl lg:text-3xl font-semibold text-foreground/70">Confirm your booking and pay</h1>
        </div>
        <div className="flex md:flex-row flex-col-reverse w-full gap-5 md:gap-10">
            <div className="flex flex-col w-full gap-5 md:gap-10">
                <SectionParkingDetails />
                <SectionStartCheckout />
                <SectionPaymentInformation />
            </div>
            <div className="md:max-w-[440px] w-full">
                <SectionBookingDetails />

            </div>
        </div>
    </div>

);
