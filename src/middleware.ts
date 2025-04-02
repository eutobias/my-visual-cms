import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Protect all routes except public ones
      const publicPaths = ["/auth/signin"];
      const isPublicPath = publicPaths.some((path) =>
        req.nextUrl.pathname.startsWith(path)
      );

      return isPublicPath || !!token;
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};