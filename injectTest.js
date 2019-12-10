var backupElement;
                var backupBorder;

                function mouseEventHandler(mEvent) {


                    // Internet Explorer
                    if (mEvent.srcElement) {
                        var path = '/html/' + getPathTo(mEvent.srcElement);

                        if (backupElement !== undefined && backupElement !== null ) {

                            backupElement.style.border = backupBorder;
                        }
                        backupElement = getElementByXpath(path);
						if(backupElement.tagName === 'IFRAME'){
							var body = backupElement.contentDocument.getElementsByTagName('body');
                            var s = document.createElement("script");
                            s.type = "text/javascript";
                            s.src = "https://github.com/cronolucas/xpathTest/blob/master/injectTest.js";
                            body[0].append(s);
						}
                        backupBorder = backupElement.style.border;
                        backupElement.style.border = 'thick solid #B70000';
						console.log(backupElement);
                    }
                    // Netscape and Firefox
                    else if (mEvent.target) {
                        alert(mEvent.target.nodeName);
                    }
                }

                function getPathTo(element) {
                    if (element === document.body)
                        return element.tagName.toLowerCase();

                    var ix = 0;
                    var siblings = element.parentNode.childNodes;
                    for (var i = 0; i < siblings.length; i++) {
                        var sibling = siblings[i];

                        if (sibling === element) return getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';

                        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                            ix++;
                        }
                    }
                }

                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }

                document.getElementsByTagName('body')[0].setAttribute('onmousemove', 'javaScript: mouseEventHandler(event);')
				var list = document.getElementsByTagName("iframe");
