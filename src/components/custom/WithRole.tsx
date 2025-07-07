"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface WithRoleProps {
    allowedRoles: string;
    children: ReactNode;
    fallback?: ReactNode; // Optional fallback component
}

const WithRole: React.FC<WithRoleProps> = ({ allowedRoles, children, fallback = null }) => {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;

    // Get user type from session
    const userType = session?.user?.user_type;

    if (!userType || allowedRoles !== userType) {
        return fallback; // Show fallback UI if unauthorized
    }

    return <>{children}</>;
};

export default WithRole;
