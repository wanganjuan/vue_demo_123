### blob
Blob 对象表示一个不可变、原始数据的 类文件对象
File 接口基于Blob，继承了 blob 的功能并将其扩展 使其 支持用户 系统上的文件。

注意：slice() 方法原本接受 length 作为第二个参数，以表示复制到新 Blob 对象的字节数。如果设置的参数使 start + length 超出了源 Blob 对象的大小，则返回从开始到结尾的所有数据。

### 构造函数
Blob(blobParts[, options])
返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
var aBlob = new Blob( array, options );


array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 
等对象构成的 Array ，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings会被编码为UTF-8。

options 是一个可选的BlobPropertyBag字典，它可能会指定如下两个属性：
type，默认值为 ""，它代表了将会被放入到blob中的数组内容的MIME类型。
endings，默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入。 它是以下两个值中的一个： "native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持blob中保存的结束符不变 

var debug = {hello: "world"};
var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
console.log(blob)

### 从Blob中读取内容的唯一方法是使用 FileReader
以下代码将 Blob 的内容作为类型数组读

### File
对象是来自用户在一个 <input> 元素上选择文件后返回的 FileList 对象,也可以是来自由拖放操作生成的 DataTransfer 对象，或者来自 HTMLCanvasElement 上的 mozGetAsFile() API。在Gecko中，特权代码可以创建代表任何本地文件的File对象，而无需用户交互（有关详细信息，请参阅注意事项。
File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap(), 及 XMLHttpRequest.send() 都能处理 Blob 和 File。

### FileReader 
对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
 FileReader仅用于以安全的方式从用户（远程）系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。 
 要在JavaScript中按路径名读取文件，应使用标准Ajax解决方案进行服务器端文件读取，如果读取跨域，则使用CORS权限。

 构造函数
FileReader()
返回一个新构造的FileReader。

FileReader.abort()
中止读取操作。在返回时，readyState属性为DONE。
FileReader.readAsArrayBuffer()
开始读取指定的 Blob中的内容, 一旦完成, result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象.
FileReader.readAsBinaryString() 
开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据。
FileReader.readAsDataURL()
开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容。
FileReader.readAsText()
开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。

FileReader.onabort
处理abort事件。该事件在读取操作被中断时触发。
FileReader.onerror
处理error事件。该事件在读取操作发生错误时触发。
FileReader.onload
处理load事件。该事件在读取操作完成时触发。
FileReader.onloadstart
处理loadstart事件。该事件在读取操作开始时触发。
FileReader.onloadend
处理loadend事件。该事件在读取操作结束时（要么成功，要么失败）触发。
FileReader.onprogress
处理progress事件。该事件在读取Blob时触发。

### URL.createObjectURL()
静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
objectURL = URL.createObjectURL(object);
###
    let  img = new Image();
    img.src = window.URL.createObjectURL(this.files[0])
    img.onload = function () {
      window.URL.revokeObjectURL(this.src);
    }
    document.body.appendChild(img)
###
参数
object
用于创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象。​

这个对象URL是一个标识File对象的字符串。每次你调用window.URL.createObjectURL()，就会产生一个唯一的对象URL，即使是你对一个已创建了对象URL的文件再次创建一个对象URL。每个创建了的对象URL必须要释放。当文档关闭时，它们会自动被释放。如果你的网页要动态使用它们，你需要显式调用 window.URL.revokeObjectURL()来释放它们：