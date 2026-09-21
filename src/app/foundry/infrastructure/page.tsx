export { default } from "@/app/infrastructure/page";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
	title: "Foundry Infrastructure | Best Steel Casting Plant in India",
	description:
		"Explore JK Foundry's melting, moulding, fettling, heat treatment, testing, and manufacturing facilities for steel cast components.",
	alternates: { canonical: "/foundry/infrastructure" },
	...pageSocialMetadata(
		"Foundry Infrastructure | Best Steel Casting Plant in India",
		"Explore JK Foundry's melting, moulding, fettling, heat treatment, testing, and manufacturing facilities for steel cast components.",
		"/foundry/infrastructure",
	),
};
