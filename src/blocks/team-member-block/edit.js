import { Component } from "@wordpress/element";
import {
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaUpload,
	MediaUploadCheck
} from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import {
	Spinner,
	withNotices,
	Toolbar,
	IconButton
} from "@wordpress/components";

class TeamMemberEdit extends Component {
	componentDidMount() {
		const { attributes, setAttributes } = this.props;
		const { url, id } = attributes;

		if (url && isBlobURL(url) && !id) {
			setAttributes({
				url: "",
				alt: ""
			});
		}
	}

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

	removeImage = () => {
		this.props.setAttributes({
			id: "",
			url: "",
			alt: ""
		});
	};

	render() {
		const { className, attributes, noticeUI } = this.props;
		const { title, info, url, alt, id } = attributes;

		return (
			<>
				<BlockControls>
					{url && (
						<Toolbar>
							{id && (
								<MediaUploadCheck>
									<MediaUpload
										onSelect={this.onSelectImage}
										allowedTypes={["image"]}
										value={id}
										render={({ open }) => {
											return (
												<IconButton
													className="components-icon-button components-toolbar__control"
													onClick={open}
													icon="edit"
													label={__(
														"Edit Image",
														"team-member-block"
													)}
												/>
											);
										}}
									/>
								</MediaUploadCheck>
							)}
							<IconButton
								className="components-icon-button components-toolbar__control"
								onClick={this.removeImage}
								icon="trash"
								label={__("Remove Image", "team-member-block")}
							/>
						</Toolbar>
					)}
				</BlockControls>
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
						className={
							"wp-block-team-member-block-team-member__title"
						}
						tagName="h4"
						onChange={this.onChangeTitle}
						value={title}
						placeholder={__("Member Name", "team-member-block")}
						formattingControls={[]}
					/>
					<RichText
						className={
							"wp-block-team-member-block-team-member__info"
						}
						tagName="p"
						onChange={this.onChangeInfo}
						value={info}
						placeholder={__("Member Info", "team-member-block")}
						formattingControls={[]}
					/>
				</div>
			</>
		);
	}
}

export default withNotices(TeamMemberEdit);
