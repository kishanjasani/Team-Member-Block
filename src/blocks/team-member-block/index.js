import "./style.editor.scss";
import "./parent";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";

import TeamMemberEdit from "./edit";

const attributes = {
	title: {
		type: "string",
		source: "html",
		selector: "h4"
	},
	info: {
		type: "string",
		source: "html",
		selector: "p"
	}
};

registerBlockType("team-member-block/team-member", {
	title: __("Team Member Block", "team-member-block"),
	description: __("Our Team Member block", "team-member-block"),
	category: "layout",
	icon: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
		</svg>
	),
	keywords: [
		__("team", "team-member-block"),
		__("member", "team-member-block"),
		__("person", "team-member-block")
	],
	parent: ["team-member-block/team-member"],
	attributes,
	edit: TeamMemberEdit,
	save: ({ className, attributes }) => {
		const { title, info } = attributes;
		return (
			<div className={className}>
				{title && (
					<RichText.Content
						className={
							"wp-block-team-member-block-team-member__title"
						}
						tagName="h4"
						value={title}
					/>
				)}
				{info && (
					<RichText.Content
						className={
							"wp-block-team-member-block-team-member__info"
						}
						tagName="p"
						value={info}
					/>
				)}
			</div>
		);
	}
});
