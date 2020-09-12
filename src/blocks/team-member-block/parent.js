import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/editor";

registerBlockType("team-member-block/team-members", {
	title: __("Team Members", "team-member-block"),
	description: __("Block showing a Team Members.", "team-member-block"),
	category: "layout",
	icon: "grid-view",
	keywords: [
		__("team", "team-member-block"),
		__("member", "team-member-block"),
		__("person", "team-member-block")
	],
	edit: ({ className }) => {
		return (
			<div className={className}>
				<InnerBlocks
					allowedBlocks={["team-member-block/team-member"]}
				/>
			</div>
		);
	},
	save: () => {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	}
});
