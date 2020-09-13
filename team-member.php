<?php
/*
 * Plugin Name:       team-member-block
 * Plugin URI:        https://github.com/kishanjasani/gutenberg-scaffold
 * Description:       Team Member Blocks.
 * Author:            Kishan Jasani
 * Author URI:        http://kishanjasani.wordpress.com/
 * Version:           1.10.3
 * Requires at least: 5.2
 * Requires PHP:      7.0
 * Text Domain:       team-member-block
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mytheme_blocks_register_block_type( $block, $options = array() ) {
	register_block_type(
		'team-member-block/' . $block,
		array_merge(
			[
				'editor_script' => 'team-member-block-editor-script',
				'editor_style'  => 'team-member-block-editor-style',
				'script'        => 'team-member-block-script',
				'style'         => 'team-member-block-style',
			],
			$options
		)
	);
}

function mytheme_blocks_register() {

	wp_register_script(
		'team-member-block-editor-script',
		plugins_url( 'dist/editor.js', __FILE__ ),
		[ 'wp-blocks', 'wp-i18n', 'wp-editor', 'wp-components', 'wp-element', 'wp-blob', 'wp-data' ]
	);

	wp_register_script(
		'team-member-block-script',
		plugins_url( 'dist/script.js', __FILE__ ),
		[ 'jquery' ]
	);

	wp_register_style(
		'team-member-block-editor-style',
		plugins_url( 'dist/editor.css', __FILE__ ),
		[ 'wp-edit-blocks' ]
	);

	wp_register_style(
		'team-member-block-style',
		plugins_url( 'dist/style.css', __FILE__ )
	);

	mytheme_blocks_register_block_type( 'team-member' );
	mytheme_blocks_register_block_type( 'team-members' );
}

add_action( 'init', 'mytheme_blocks_register' );
