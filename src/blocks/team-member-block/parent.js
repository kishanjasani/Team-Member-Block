import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks, InspectorControls } from "@wordpress/editor";
import { PanelBody, RangeControl } from "@wordpress/components";

const attributes = {
	columns: {
		type: "number",
		default: 2
	}
};

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
	attributes,
	edit: ({ className, attributes, setAttributes }) => {
		const { columns } = attributes;
		return (
			<div className={`${className} has-${columns}-columns`}>
				<InspectorControls>
					<PanelBody
						title={__("Column Settings", "team-member-block")}
					>
						<RangeControl
							label={__("Columns", "team-member-block")}
							value={columns}
							onChange={columns => setAttributes({ columns })}
							min={1}
							max={6}
						/>
					</PanelBody>
				</InspectorControls>
				<InnerBlocks
					allowedBlocks={["team-member-block/team-member"]}
					template={[
						["team-member-block/team-member"],
						["team-member-block/team-member"]
					]}
				/>
			</div>
		);
	},
	save: ({ attributes }) => {
		const { columns } = attributes;
		return (
			<div className={`has-${columns}-columns`}>
				<InnerBlocks.Content />
			</div>
		);
	}
});
