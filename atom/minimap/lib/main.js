'use babel'

import {Emitter, CompositeDisposable} from 'atom'
import include from './decorators/include'
import Minimap from './minimap'
import MinimapElement from './minimap-element'
import PluginManagement from './mixins/plugin-management'
import MinimapPluginGeneratorElement from './minimap-plugin-generator-element'

/**
 * The `Minimap` package provides an eagle-eye view of text buffers.
 *
 * It also provides API for plugin packages that want to interact with the
 * minimap and be available to the user through the minimap settings.
 */
@include(PluginManagement)
class Main {
  /**
   * Used only at export time.
   *
   * @access private
   */
  constructor () {
    /**
     * The activation state of the package.
     *
     * @type {boolean}
     * @access private
     */
    this.active = false
    /**
     * The toggle state of the package.
     *
     * @type {boolean}
     * @access private
     */
    this.toggled = false
    /**
     * The `Map` where Minimap instances are stored with the text editor they
     * target as key.
     *
     * @type {Map}
     * @access private
     */
    this.editorsMinimaps = null
    /**
     * The composite disposable that stores the package's subscriptions.
     *
     * @type {CompositeDisposable}
     * @access private
     */
    this.subscriptions = null
    /**
     * The disposable that stores the package's commands subscription.
     *
     * @type {Disposable}
     * @access private
     */
    this.subscriptionsOfCommands = null
    /**
     * The package's config object.
     *
     * @type {Object}
     * @access private
     */
    this.config = require('./config-schema.json')
    /**
     * The package's events emitter.
     *
     * @type {Emitter}
     * @access private
     */
    this.emitter = new Emitter()

    this.initializePlugins()
  }

  /**
   * Activates the minimap package.
   */
  activate () {
    if (this.active) { return }

    MinimapElement.registerViewProvider()

    this.subscriptionsOfCommands = atom.commands.add('atom-workspace', {
      'minimap:toggle': () => {
        this.toggle()
      },
      'minimap:generate-coffee-plugin': () => {
        this.generatePlugin('coffee')
      },
      'minimap:generate-javascript-plugin': () => {
        this.generatePlugin('javascript')
      },
      'minimap:generate-babel-plugin': () => {
        this.generatePlugin('babel')
      }
    })

    this.editorsMinimaps = new Map()
    this.subscriptions = new CompositeDisposable()
    this.active = true

    if (atom.config.get('minimap.autoToggle')) { this.toggle() }
  }

  /**
   * Deactivates the minimap package.
   */
  deactivate () {
    if (!this.active) { return }

    this.deactivateAllPlugins()

    if (this.editorsMinimaps) {
      this.editorsMinimaps.forEach((value, key) => {
        value.destroy()
        this.editorsMinimaps.delete(key)
      })
    }

    this.subscriptions.dispose()
    this.subscriptions = null
    this.subscriptionsOfCommands.dispose()
    this.subscriptionsOfCommands = null
    this.editorsMinimaps = undefined
    this.toggled = false
    this.active = false
  }

  /**
   * Toggles the minimap display.
   */
  toggle () {
    if (!this.active) { return }

    if (this.toggled) {
      this.toggled = false

      if (this.editorsMinimaps) {
        this.editorsMinimaps.forEach((value, key) => {
          value.destroy()
          this.editorsMinimaps.delete(key)
        })
      }
      this.subscriptions.dispose()
    } else {
      this.toggled = true
      this.initSubscriptions()
    }
  }

  /**
   * Opens the plugin generation view.
   *
   * @param  {string} template the name of the template to use
   */
  generatePlugin (template) {
    var view = new MinimapPluginGeneratorElement()
    view.template = template
    view.attach()
  }

  /**
   * Registers a callback to listen to the `did-activate` event of the package.
   *
   * @param  {function(event:Object):void} callback the callback function
   * @return {Disposable} a disposable to stop listening to the event
   */
  onDidActivate (callback) {
    return this.emitter.on('did-activate', callback)
  }

  /**
   * Registers a callback to listen to the `did-deactivate` event of the
   * package.
   *
   * @param  {function(event:Object):void} callback the callback function
   * @return {Disposable} a disposable to stop listening to the event
   */
  onDidDeactivate (callback) {
    return this.emitter.on('did-deactivate', callback)
  }

  /**
   * Registers a callback to listen to the `did-create-minimap` event of the
   * package.
   *
   * @param  {function(event:Object):void} callback the callback function
   * @return {Disposable} a disposable to stop listening to the event
   */
  onDidCreateMinimap (callback) {
    return this.emitter.on('did-create-minimap', callback)
  }

  /**
   * Registers a callback to listen to the `did-add-plugin` event of the
   * package.
   *
   * @param  {function(event:Object):void} callback the callback function
   * @return {Disposable} a disposable to stop listening to the event
   */
  onDidAddPlugin (callback) {
    return this.emitter.on('did-add-plugin', callback)
  }

  /**
   * Registers a callback to listen to the `did-remove-plugin` event of the
   * package.
   *
   * @param  {function(event:Object):void} callback the callback function
   * @return {Disposable} a disposable to stop listening to the event
   */
  onDidRemovePlugin (callback) {
    return this.emitter.on('did-remove-plugin', callback)
  }

  /**
   * Registers a callback to listen to the `did-activate-plugin` event of the
   * package.
   *
   * @param  {function(event:Object):void} callback the callback function
   * @return {Disposable} a disposable to stop listening to the event
   */
  onDidActivatePlugin (callback) {
    return this.emitter.on('did-activate-plugin', callback)
  }

  /**
   * Registers a callback to listen to the `did-deactivate-plugin` event of the
   * package.
   *
   * @param  {function(event:Object):void} callback the callback function
   * @return {Disposable} a disposable to stop listening to the event
   */
  onDidDeactivatePlugin (callback) {
    return this.emitter.on('did-deactivate-plugin', callback)
  }

  /**
   * Returns the `Minimap` class
   *
   * @return {Function} the `Minimap` class constructor
   */
  minimapClass () { return Minimap }

  /**
   * Returns the `Minimap` object associated to the passed-in
   * `TextEditorElement`.
   *
   * @param  {TextEditorElement} editorElement a text editor element
   * @return {Minimap} the associated minimap
   */
  minimapForEditorElement (editorElement) {
    if (!editorElement) { return }
    return this.minimapForEditor(editorElement.getModel())
  }

  /**
   * Returns the `Minimap` object associated to the passed-in
   * `TextEditor`.
   *
   * @param  {TextEditor} textEditor a text editor
   * @return {Minimap} the associated minimap
   */
  minimapForEditor (textEditor) {
    if (!textEditor) { return }

    let minimap = this.editorsMinimaps.get(textEditor)

    if (!minimap) {
      minimap = new Minimap({textEditor})
      this.editorsMinimaps.set(textEditor, minimap)

      var editorSubscription = textEditor.onDidDestroy(() => {
        let minimaps = this.editorsMinimaps
        if (minimaps) { minimaps.delete(textEditor) }
        editorSubscription.dispose()
      })
    }

    return minimap
  }

  /**
   * Returns a new stand-alone {Minimap} for the passed-in `TextEditor`.
   *
   * @param  {TextEditor} textEditor a text editor instance to create
   *                                 a minimap for
   * @return {Minimap} a new stand-alone Minimap for the passed-in editor
   */
  standAloneMinimapForEditor (textEditor) {
    if (!textEditor) { return }

    return new Minimap({
      textEditor: textEditor,
      standAlone: true
    })
  }

  /**
   * Returns the `Minimap` associated to the active `TextEditor`.
   *
   * @return {Minimap} the active Minimap
   */
  getActiveMinimap () {
    return this.minimapForEditor(atom.workspace.getActiveTextEditor())
  }

  /**
   * Calls a function for each present and future minimaps.
   *
   * @param  {function(minimap:Minimap):void} iterator a function to call with
   *                                                   the existing and future
   *                                                   minimaps
   * @return {Disposable} a disposable to unregister the observer
   */
  observeMinimaps (iterator) {
    if (!iterator) { return }

    if (this.editorsMinimaps) {
      this.editorsMinimaps.forEach((minimap) => { iterator(minimap) })
    }
    return this.onDidCreateMinimap((minimap) => { iterator(minimap) })
  }

  /**
   * Registers to the `observeTextEditors` method.
   *
   * @access private
   */
  initSubscriptions () {
    this.subscriptions.add(atom.workspace.observeTextEditors((textEditor) => {
      let minimap = this.minimapForEditor(textEditor)
      let minimapElement = atom.views.getView(minimap)

      this.emitter.emit('did-create-minimap', minimap)

      minimapElement.attach()
    }))
  }
}

/**
 * The exposed instance of the `Main` class.
 *
 * @access private
 */
export default new Main()
