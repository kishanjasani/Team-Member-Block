import { Component } from "@wordpress/element";
import { RichText, MediaPlaceholder } from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import { Spinner, withNotices } from "@wordpress/components";

class TeamMemberEdit extends Component {
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeInfo = info => {
		this.props.setAttributes({ info });
	};

	onSelectImage = ({ id, url, alt }) => {
		this.props.setAttributes({ id, url, alt });
	};

	onSelectUrl = url => {
		this.props.setAttributes({
			url,
			id: null,
			alt: ""
		});
	};

	onImageUploadError = message => {
		const { noticeOperations } = this.props;
		noticeOperations.createErrorNotice(message);
	};

	render() {
		const { className, attributes, noticeUI } = this.props;
		const { title, info, url, alt } = attributes;

		return (
			<div className={className}>
				{url ? (
					<>
						<img src={url} alt={alt} />
						{isBlobURL(url) && <Spinner />}
					</>
				) : (
					<MediaPlaceholder
						icon="format-image"
						onSelect={this.onSelectImage}
						onSelectURL={this.onSelectUrl}
						onError={this.onImageUploadError}
						accept="image/*"
						allowedTypes={["image"]}
						notices={noticeUI}
					/>
				)}
				<RichText
					className={"wp-block-team-member-block-team-member__title"}
					tagName="h4"
					onChange={this.onChangeTitle}
					value={title}
					placeholder={__("Member Name", "team-member-block")}
					formattingControls={[]}
				/>
				<RichText
					className={"wp-block-team-member-block-team-member__info"}
					tagName="p"
					onChange={this.onChangeInfo}
					value={info}
					placeholder={__("Member Info", "team-member-block")}
					formattingControls={[]}
				/>
			</div>
		);
	}
}

export default withNotices(TeamMemberEdit);
