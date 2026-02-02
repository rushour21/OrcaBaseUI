import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";

export default function OAuthSuccess() {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    useEffect(() => {
        const handleOAuthCallback = async () => {
            try {
                // Get token from URL query params
                const params = new URLSearchParams(window.location.search);
                const token = params.get("token");

                if (!token) {
                    console.error("No token found in OAuth callback");
                    navigate("/login");
                    return;
                }

                // Decode the JWT to get user info (basic decode, not verification)
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                        .join('')
                );

                const payload = JSON.parse(jsonPayload);

                // Extract user info from JWT payload
                const user = {
                    id: payload.userId || payload.id,
                    email: payload.email,
                    name: payload.name
                };

                // Save to auth store (which syncs to localStorage)
                setAuth(user, token);

                // Redirect to workspaces
                navigate("/workspaces");
            } catch (error) {
                console.error("OAuth callback error:", error);
                navigate("/login");
            }
        };

        handleOAuthCallback();
    }, [navigate, setAuth]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-brand mx-auto mb-4" />
                <p className="text-foreground-secondary">Completing sign in...</p>
            </div>
        </div>
    );
}
