import {
  trigger,
  state,
  animate,
  transition,
  query,
  style,
} from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('1.3s', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('1.3s', style({ opacity: 0 }))
    ])
  ]);

const offStyle = style({ opacity: 0, transform: 'translateY(50%)' });
const onStyle = style({ opacity: 1, transform: 'translateY(0%)' });
const isOptional = { optional: true };
const leaveAnimation = '{{ transition_duration }} 150ms ease-in';
const enterAnimation = '{{ transition_duration }} {{ delay }} ease-out';

export const fadeAnimation =
  trigger('fadeAnimation', [
    transition( '* => *', [
      query(':enter', offStyle, isOptional),
      query(':leave', [onStyle, animate(leaveAnimation, offStyle)], isOptional),
      query(':enter', [offStyle, animate(enterAnimation, onStyle)], isOptional),
    ], { params: { delay: '150ms', transition_duration: '0.35s' } })
  ]);
// export const fadeAnimation =
  // trigger('fadeAnimation', [
  //   transition( '* => *', [
  //     query(
  //       ':enter',
  //       [ style({ opacity: 0, transform: 'translateY(50%)' })],
  //       { optional: true }
  //     ),
  //     query(
  //       ':leave',
  //       [ style({ opacity: 1 }),
  //         animate('{{ transition_duration }} 150ms ease-in', style({ opacity: 0, transform: 'translateX(50%)'  }))
  //       ],
  //       { optional: true }
  //     ),
  //     query(
  //       ':enter',
  //       [ style({ opacity: 0, transform: 'translateY(50%)'  }),
  //         animate('{{ transition_duration }} {{ delay }} ease-out', style({ opacity: 1, transform: 'translateY(0%)'  }))
  //       ],
  //       { optional: true }
  //     )
  //   ], { params: { delay: '150ms', transition_duration: '0.35s' } })
  // ]);

