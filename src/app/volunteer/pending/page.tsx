"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Info, ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function VolunteerPendingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-6"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Application Submitted!
          </h1>
          <p className="text-lg text-foreground/60 max-w-lg mx-auto">
            Thank you for choosing to make a difference. Your application is now under review by our admin team.
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-border shadow-xl shadow-accent/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Clock className="w-24 h-24" />
             </div>
             
             <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-accent" />
                What happens next?
             </h2>
             <ul className="space-y-4 text-foreground/70">
                <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold mt-0.5 shrink-0">1</div>
                   <p>Our team will verify your details and ID proof within <strong>24-48 hours</strong>.</p>
                </li>
                <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold mt-0.5 shrink-0">2</div>
                   <p>You'll receive an <strong>email & WhatsApp confirmation</strong> once approved.</p>
                </li>
                <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold mt-0.5 shrink-0">3</div>
                   <p>After approval, you can log in to access your <strong>Volunteer Portal</strong> and start matching with students.</p>
                </li>
             </ul>
          </div>

          <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
             <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <Info className="w-5 h-5 text-primary" />
                While you wait...
             </h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="#" className="p-4 bg-white rounded-2xl border border-primary/10 hover:border-primary transition-all flex items-center justify-between group">
                   <span className="font-semibold text-primary">Read Code of Conduct</span>
                   <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                </Link>
                <Link href="#" className="p-4 bg-white rounded-2xl border border-primary/10 hover:border-primary transition-all flex items-center justify-between group">
                   <span className="font-semibold text-primary">Mentorship Tips</span>
                   <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                </Link>
             </div>
          </div>
        </div>

        <div className="mt-12 text-center">
           <Link href="/" className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary transition-colors font-medium">
              Return to Landing Page
              <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </div>
    </div>
  );
}
