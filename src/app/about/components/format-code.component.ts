import { Component, Input } from '@angular/core';

@Component({
  selector: 'rf-format-code',
  template: `
  <div class="sample-label">Sample:</div>
  <div class="sample">
    <div class="sample-content">
      <ng-content></ng-content>
    </div>
    <div class="sample-label">Code:</div>
    <div class="code">

    {{ _content }}
    </div>
</div>
  `,
})
export class FormatCodeComponent {
  _content = '';
  @Input() set content(value) {
    this._content = formatContent(
      value.replace(/^\n|^\r\n/, '').replace(/\n$|\r\n$/, '')
    );
  }
}

function formatContent(content: string) {
  const [firstLine] = content.split('\n');
  let startWithEmpty = 0;
  while (
    firstLine.charAt(startWithEmpty) === ' ' ||
    firstLine.charAt(startWithEmpty) === '\t'
  ) {
    startWithEmpty++;
  }

  return content.split(/\n/)
    // .slice(1, lines.length - 1)
    .map(line => line.slice(startWithEmpty))
    .join('\n');
}
